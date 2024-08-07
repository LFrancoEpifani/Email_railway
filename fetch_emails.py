import mysql.connector
from mysql.connector import Error
import json
from datetime import datetime

def fetch_emails():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='admin',
            database='mailparser'
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT * FROM email')
            emails = cursor.fetchall()

            # Convert datetime fields to strings
            for email in emails:
                for key, value in email.items():
                    if isinstance(value, datetime):
                        email[key] = value.isoformat()

            

    except Error as e:
        print(json.dumps({"message": f"Error fetching emails: {e}"}))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    fetch_emails()
