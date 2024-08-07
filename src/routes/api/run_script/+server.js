import { exec } from 'child_process';
import { resolve } from 'path';

export async function POST({ request }) {
  const { scriptName } = await request.json();
  const scriptPath = resolve(scriptName);

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
        resolve(new Response(JSON.stringify({ message: 'An error occurred' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      } else {
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
