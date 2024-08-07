import { mysqlconnFn } from "$lib/db/mysql";

// Función para cargar los emails
export async function load({ url }) {
  let mysqlconn = await mysqlconnFn();
  let tagFilter = url.searchParams.get('tagFilter');
  let queryStr = "SELECT * FROM email";
  let params = [];

  if (tagFilter) {
    queryStr += " WHERE FIND_IN_SET(?, manualTags)";
    params.push(tagFilter);
  }

  try {
    let results = await mysqlconn.query(queryStr, params).then(function ([rows, fields]) {
      return rows;
    });

    return {
      data: results,
    };
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return {
      status: 500,
      error: new Error("Failed to load emails")
    };
  }
}
