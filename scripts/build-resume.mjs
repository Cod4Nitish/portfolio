import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptsDirectory, '..');
const dataPath = path.join(root, 'content', 'portfolio-data.js');
const pdfScript = path.join(scriptsDirectory, 'build_resume_pdf.py');

const getPortfolioData = () => {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(dataPath, 'utf8'), sandbox, { filename: dataPath });
  return sandbox.window.PORTFOLIO_DATA || {};
};

const getPython = () => {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : process.platform === 'win32' ? ['py', 'python'] : ['python3', 'python'];
  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ['--version'], { stdio: 'ignore', shell: false });
    if (!probe.error && probe.status === 0) return candidate;
  }
  throw new Error('Python 3 was not found. Install Python 3 or set the PYTHON environment variable, then run this command again.');
};

const build = () => {
  const data = getPortfolioData();
  const payload = JSON.stringify({ profile: data.profile || {}, resume: data.resume || {}, projects: data.projects || [], events: data.events || [] });
  execFileSync(getPython(), [pdfScript], {
    cwd: root,
    env: { ...process.env, NITISH_RESUME_DATA: payload, NITISH_RESUME_OUTPUT: path.join(root, 'assets', 'nitish-resume.pdf'), NITISH_RESUME_DESIGNED_OUTPUT: path.join(root, 'assets', 'nitish-resume-designed.pdf') },
    stdio: 'inherit',
  });
  console.log('Updated assets/nitish-resume.pdf and assets/nitish-resume-designed.pdf from content/portfolio-data.js');
};

build();

if (process.argv.includes('--watch')) {
  console.log('Watching content/portfolio-data.js for résumé updates. Press Ctrl+C to stop.');
  let timer;
  watch(dataPath, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (error) {
        console.error(`Résumé update failed: ${error.message}`);
      }
    }, 180);
  });
}
