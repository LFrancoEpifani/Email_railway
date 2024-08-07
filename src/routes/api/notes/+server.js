import { mysqlconnFn } from "$lib/db/mysql";

export async function GET({ url }) {
  const emailId = url.searchParams.get('emailId');
  const noteId = url.searchParams.get('noteId');
  let mysqlconn = await mysqlconnFn();

  if (emailId) {
    try {
      const [rows] = await mysqlconn.execute('SELECT * FROM email_notes WHERE email_id = ?', [emailId]);
      return new Response(JSON.stringify({ notes: rows }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), { status: 500 });
    }
  }

  if (noteId) {
    try {
      const [rows] = await mysqlconn.execute('SELECT * FROM email_notes WHERE id = ?', [noteId]);
      return new Response(JSON.stringify({ note: rows[0] }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch note' }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: 'Invalid query parameters' }), { status: 400 });
}

export async function POST({ request }) {
  const { emailId, note } = await request.json();
  let mysqlconn = await mysqlconnFn();

  try {
    const [result] = await mysqlconn.execute('INSERT INTO email_notes (email_id, note) VALUES (?, ?)', [emailId, note]);
    const noteId = result.insertId;
    return new Response(JSON.stringify({ success: true, note: { id: noteId, email_id: emailId, note: note } }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to add note' }), { status: 500 });
  }
}

export async function DELETE({ url }) {
  const noteId = url.searchParams.get('noteId');
  let mysqlconn = await mysqlconnFn();

  try {
    await mysqlconn.execute('DELETE FROM email_notes WHERE id = ?', [noteId]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete note' }), { status: 500 });
  }
}
