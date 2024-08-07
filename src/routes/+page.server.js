import { mysqlconnFn } from "$lib/db/mysql";

export async function load({ url }) {
  try {
    let mysqlconn = await mysqlconnFn();
    let tagFilter = url.searchParams.get('tagFilter');
    let queryStr = "SELECT * FROM email";
    let params = [];

    if (tagFilter) {
      queryStr += " WHERE FIND_IN_SET(?, manualTags)";
      params.push(tagFilter);
    }

    let results = await mysqlconn.query(queryStr, params).then(function ([rows, fields]) {
      return rows;
    });

    return {
      data: results,
    };
  } catch (error) {
    console.error("Error loading emails:", error);
    return {
      status: 500,
      error: new Error("Failed to load emails")
    };
  }
}
