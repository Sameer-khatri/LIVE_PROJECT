import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('🚀 Starting AuthSentry ITDR Autonomous Defense Suite');
console.log('📡 Backend: http://localhost:3001 (Express REST + SSE)');
console.log('💻 Frontend: http://localhost:5173 (Vite + React 18)');
console.log('====================================================\n');

// 1. Spawn Express Backend on Port 3001
const server = spawn('node', ['server/index.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// 2. Spawn Vite Frontend Dev Server on Port 5173
const client = spawn('npx', ['vite'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

const handleExit = () => {
  console.log('\n🛑 Shutting down AuthSentry services...');
  server.kill();
  client.kill();
  process.exit();
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

