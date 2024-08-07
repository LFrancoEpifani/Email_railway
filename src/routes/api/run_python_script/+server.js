import { exec } from 'child_process';
import { resolve } from 'path';

export async function POST() {
  const scriptPath = resolve('analyze_emails.py');

  return new Promise((resolve, reject) => {
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        resolve(new Response(JSON.stringify({ message: 'An error occurred' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      } else if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        resolve(new Response(JSON.stringify({ message: 'An error occurred' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      } else {
        console.log(`Script stdout: ${stdout}`);
        resolve(new Response(JSON.stringify({ message: 'Script executed successfully' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      }
    });
  });
}
