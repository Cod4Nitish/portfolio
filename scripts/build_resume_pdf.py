"""Builds both résumé PDFs from content/portfolio-data.js (run via scripts/build-resume.mjs).

- NITISH_RESUME_OUTPUT: ATS-friendly, single column, plain structure (for job applications).
- NITISH_RESUME_DESIGNED_OUTPUT: two-column designed version (for sharing on LinkedIn / the portfolio).
"""
import html
import json
import os
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, FrameBreak, HRFlowable, KeepTogether, PageTemplate, Paragraph,
    SimpleDocTemplate, Spacer, Table, TableStyle,
)

PORTFOLIO_URL = "https://nitish-portfolio-bice-three.vercel.app/"
GITHUB_URL = "https://github.com/Cod4Nitish"

# Arial ships with Windows and includes the ₹ glyph; Helvetica does not.
FONT_DIR = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
try:
    for name, file in [("Body", "arial.ttf"), ("Body-Bold", "arialbd.ttf"), ("Body-Italic", "ariali.ttf"), ("Body-BoldItalic", "arialbi.ttf")]:
        pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / file)))
    pdfmetrics.registerFontFamily("Body", normal="Body", bold="Body-Bold", italic="Body-Italic", boldItalic="Body-BoldItalic")
    BODY, BOLD, ITALIC, RUPEE = "Body", "Body-Bold", "Body-Italic", "₹"
except Exception:
    BODY, BOLD, ITALIC, RUPEE = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Rs. "


def text(value):
    return html.escape(str(value or "")).replace("₹", RUPEE)


def link(url, label, color="#1e5db5"):
    return f'<link href="{text(url)}" color="{color}"><u>{text(label)}</u></link>'


data = json.loads(os.environ["NITISH_RESUME_DATA"])
profile = data.get("profile", {})
resume = data.get("resume", {})
projects_by_title = {p.get("title"): p for p in data.get("projects", [])}

name = resume.get("name") or "Nitish Kumar Singh"
headline = "AI Engineer · Agentic AI & RAG Systems"
location = "Greater Noida, Uttar Pradesh"
phone = resume.get("phone", "+91 6206889310")
email = resume.get("email", "theeditornitish@gmail.com")
linkedin = profile.get("linkedinUrl", "https://www.linkedin.com/in/nitish-ai-engineer")

# AI-engineer target: lead with AI skills.
SKILL_ORDER = ["AI systems", "Languages", "Backend", "Databases", "Frontend", "Delivery", "Security", "Core CS"]
skills = sorted(resume.get("skills", []), key=lambda g: SKILL_ORDER.index(g.get("label")) if g.get("label") in SKILL_ORDER else 99)

resume_projects = []
for item in resume.get("resumeProjects", []):
    source = projects_by_title.get(item.get("title"), {})
    resume_projects.append({**item, "href": source.get("href"), "repository": source.get("repository")})

certifications = [c for c in resume.get("certifications", []) if isinstance(c, dict) and "Expired" not in c.get("date", "")]


def cert_line(c):
    year = c.get("date", "").replace("Issued ", "")
    return f"<b>{text(c.get('title'))}</b> — {text(c.get('issuer'))}{', ' + text(year) if year else ''}"


def project_links(project, color):
    links = []
    if project.get("href"):
        links.append(link(project["href"], "Live", color))
    if project.get("repository"):
        links.append(link(project["repository"], "GitHub", color))
    return " | ".join(links)


def write(doc_builder, output):
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_suffix(".next.pdf")
    pages = doc_builder(temporary)
    temporary.replace(output)
    print(f"Created {output} ({pages} page{'s' if pages != 1 else ''})")


# ---------------------------------------------------------------- ATS version
def build_ats(path):
    blue, ink, muted, rule = (colors.HexColor(c) for c in ("#1f3a68", "#151515", "#33363b", "#9fa5ae"))
    S = {
        "name": ParagraphStyle("name", fontName=BOLD, fontSize=20, leading=23, alignment=TA_CENTER, textColor=blue),
        "headline": ParagraphStyle("headline", fontName=BODY, fontSize=10, leading=13, alignment=TA_CENTER, textColor=ink, spaceAfter=2),
        "contact": ParagraphStyle("contact", fontName=BODY, fontSize=8.4, leading=11, alignment=TA_CENTER, textColor=muted, spaceAfter=4),
        "h": ParagraphStyle("h", fontName=BOLD, fontSize=10.4, leading=12, textColor=blue, spaceBefore=5, spaceAfter=1),
        "body": ParagraphStyle("body", fontName=BODY, fontSize=8.5, leading=11, textColor=muted),
        "strong": ParagraphStyle("strong", fontName=BOLD, fontSize=9, leading=11.2, textColor=ink),
        "meta": ParagraphStyle("meta", fontName=ITALIC, fontSize=8.1, leading=10.2, textColor=muted),
        "right": ParagraphStyle("right", fontName=BODY, fontSize=8.4, leading=11.2, textColor=ink, alignment=2),
        "bullet": ParagraphStyle("bullet", fontName=BODY, fontSize=8.3, leading=10.5, leftIndent=11, firstLineIndent=0, bulletIndent=2, textColor=muted, spaceAfter=0.6),
    }

    def section(title):
        return [Paragraph(text(title).upper(), S["h"]), HRFlowable(width="100%", thickness=0.6, color=rule, spaceBefore=0, spaceAfter=3)]

    def row(left, right, left_style="strong"):
        t = Table([[Paragraph(left, S[left_style]), Paragraph(right, S["right"])]], colWidths=[5.6 * inch, 1.73 * inch], hAlign="LEFT")
        t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
        return t

    story = [Paragraph(text(name).upper(), S["name"]), Paragraph(text(headline), S["headline"])]
    story.append(Paragraph(" | ".join([text(location), text(phone), link(f"mailto:{email}", email), link(linkedin, "LinkedIn"), link(GITHUB_URL, "GitHub"), link(PORTFOLIO_URL, "Portfolio")]), S["contact"]))

    story += section("Summary")
    story.append(Paragraph(text(resume.get("summary")), S["body"]))

    story += section("Experience")
    for job in resume.get("experience", []):
        block = [row(f"{text(job['role'])} — {text(job['company'])}", text(job.get("dates")))]
        block += [Paragraph(text(b), S["bullet"], bulletText="•") for b in job.get("bullets", [])]
        story.append(KeepTogether(block))
        story.append(Spacer(1, 2))

    story += section("Projects")
    for project in resume_projects:
        block = [row(f"{text(project['title'])} — {text(project.get('subtitle'))}", project_links(project, "#1e5db5"))]
        block.append(Paragraph(text(project.get("stack")), S["meta"]))
        block += [Paragraph(text(b), S["bullet"], bulletText="•") for b in project.get("bullets", [])]
        story.append(KeepTogether(block))
        story.append(Spacer(1, 2.5))

    story += section("Technical Skills")
    for group in skills:
        story.append(Paragraph(f"<b>{text(group['label'])}:</b> {text(', '.join(group.get('items', [])))}", S["body"]))

    story += section("Awards & Achievements")
    for win in resume.get("wins", []):
        story.append(Paragraph(f"<b>{text(win['title'])}</b> — {text(win['detail'])}", S["bullet"], bulletText="•"))

    story += section("Education")
    for item in resume.get("education", []):
        story.append(row(text(item.get("institution")), text(item.get("dates"))))
        story.append(Paragraph(text(item.get("qualification")), S["meta"]))
        story.append(Spacer(1, 2))

    story += section("Certifications")
    for c in certifications[:6]:
        story.append(Paragraph(cert_line(c), S["bullet"], bulletText="•"))

    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=34, rightMargin=34, topMargin=26, bottomMargin=24, title=f"{name} — Résumé", author=name, subject=headline)
    doc.build(story)
    return doc.page


# ----------------------------------------------------------- Designed version
def build_designed(path):
    navy, teal, ink, muted, soft = (colors.HexColor(c) for c in ("#10233f", "#0d9488", "#16181d", "#3d424a", "#eef6f5"))
    page_w, page_h = A4
    header_h = 92
    margin = 28
    side_w = 178
    gap = 18

    S = {
        "sideH": ParagraphStyle("sideH", fontName=BOLD, fontSize=9.2, leading=11, textColor=navy, spaceBefore=8, spaceAfter=3),
        "side": ParagraphStyle("side", fontName=BODY, fontSize=7.9, leading=10.2, textColor=muted),
        "sideB": ParagraphStyle("sideB", fontName=BOLD, fontSize=8, leading=10.2, textColor=ink),
        "h": ParagraphStyle("h", fontName=BOLD, fontSize=10.6, leading=12.5, textColor=navy, spaceBefore=6, spaceAfter=2),
        "body": ParagraphStyle("body", fontName=BODY, fontSize=8.5, leading=11.2, textColor=muted),
        "strong": ParagraphStyle("strong", fontName=BOLD, fontSize=9.2, leading=11.4, textColor=ink),
        "meta": ParagraphStyle("meta", fontName=BODY, fontSize=7.8, leading=10, textColor=teal),
        "bullet": ParagraphStyle("bullet", fontName=BODY, fontSize=8.3, leading=10.6, leftIndent=10, bulletIndent=1, textColor=muted, spaceAfter=0.6),
    }

    def heading(title, style="h"):
        return [Paragraph(text(title).upper(), S[style]), HRFlowable(width=26, thickness=2, color=teal, hAlign="LEFT", spaceBefore=0, spaceAfter=4)]

    def draw_page(canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(navy)
        canvas.rect(0, page_h - header_h, page_w, header_h, stroke=0, fill=1)
        canvas.setFillColor(teal)
        canvas.rect(0, page_h - header_h - 4, page_w, 4, stroke=0, fill=1)
        canvas.setFillColor(colors.white)
        canvas.setFont(BOLD, 24)
        canvas.drawString(margin, page_h - 42, name.upper())
        canvas.setFont(BODY, 11)
        canvas.setFillColor(colors.HexColor("#7fe3d6"))
        canvas.drawString(margin, page_h - 62, headline)
        canvas.setFillColor(colors.HexColor("#c9d4e4"))
        canvas.setFont(BODY, 8.4)
        canvas.drawString(margin, page_h - 79, f"{location}  ·  {phone}  ·  {email}")
        # Sidebar tint
        canvas.setFillColor(soft)
        canvas.rect(0, 0, margin + side_w + gap / 2, page_h - header_h - 4, stroke=0, fill=1)
        canvas.restoreState()

    body_top = page_h - header_h - 4 - 10
    side_frame = Frame(margin - 6, 18, side_w, body_top - 18, leftPadding=0, rightPadding=4, topPadding=0, bottomPadding=0, id="side")
    main_x = margin + side_w + gap
    main_frame = Frame(main_x, 18, page_w - main_x - margin, body_top - 18, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="main")

    side = heading("Links", "sideH")
    for label, url in [("Portfolio", PORTFOLIO_URL), ("LinkedIn", linkedin), ("GitHub", GITHUB_URL)]:
        side.append(Paragraph(f"<b>{label}</b><br/>{link(url, url.replace('https://', '').replace('www.', '').rstrip('/'), '#0d6f67')}", S["side"]))
        side.append(Spacer(1, 3))

    side += heading("Skills", "sideH")
    for group in skills:
        side.append(Paragraph(text(group["label"]), S["sideB"]))
        side.append(Paragraph(text(" · ".join(group.get("items", []))), S["side"]))
        side.append(Spacer(1, 3))

    side += heading("Education", "sideH")
    for item in resume.get("education", []):
        side.append(Paragraph(text(item.get("qualification")), S["sideB"]))
        side.append(Paragraph(f"{text(item.get('institution'))}<br/><font color='#0d9488'>{text(item.get('dates'))}</font>", S["side"]))
        side.append(Spacer(1, 4))

    side += heading("Certifications", "sideH")
    for c in certifications[:5]:
        side.append(Paragraph(f"<b>{text(c.get('title'))}</b><br/>{text(c.get('issuer'))}", S["side"]))
        side.append(Spacer(1, 2.5))

    main = heading("Profile")
    main.append(Paragraph(text(resume.get("summary")), S["body"]))

    main += heading("Experience")
    for job in resume.get("experience", []):
        main.append(Paragraph(f"{text(job['role'])} <font name='{BODY}' color='#3d424a'>· {text(job['company'])}</font>", S["strong"]))
        main.append(Paragraph(text(job.get("dates")), S["meta"]))
        main += [Paragraph(text(b), S["bullet"], bulletText="•") for b in job.get("bullets", [])]

    main += heading("Awards")
    for win in resume.get("wins", []):
        main.append(Paragraph(f"<b>{text(win['title'])}</b> — {text(win['detail'])}", S["bullet"], bulletText="★"))

    main += heading("Selected Projects")
    for project in resume_projects:
        links = project_links(project, "#0d6f67")
        block = [Paragraph(f"{text(project['title'])} <font name='{BODY}' color='#3d424a'>· {text(project.get('subtitle'))}</font>{'&nbsp;&nbsp;' + links if links else ''}", S["strong"])]
        block.append(Paragraph(text(project.get("stack")), S["meta"]))
        block += [Paragraph(text(b), S["bullet"], bulletText="•") for b in project.get("bullets", [])]
        block.append(Spacer(1, 3))
        main.append(KeepTogether(block))

    doc = BaseDocTemplate(str(path), pagesize=A4, leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0, title=f"{name} — Résumé", author=name, subject=headline)
    doc.addPageTemplates([PageTemplate(id="page", frames=[side_frame, main_frame], onPage=draw_page)])
    doc.build(side + [FrameBreak()] + main)
    return doc.page


write(build_ats, Path(os.environ["NITISH_RESUME_OUTPUT"]))
designed = os.environ.get("NITISH_RESUME_DESIGNED_OUTPUT")
if designed:
    write(build_designed, Path(designed))
