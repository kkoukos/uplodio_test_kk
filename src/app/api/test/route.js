export async function GET(request) {
  try {
    // client.connect();
    // db = client.db("settings");
    // const collection = db.collection("commodity");

    // // Insert data into MongoDB
    // const result = await collection.insertMany(
    //   array.map((item) => ({
    //     name: item.name,
    //   }))
    // );

    // if (data.error) {
    //   console.log(data.error);
    //   return Response.json({ result: false, error: data.error });
    // }
    const users = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        age: 25,
        isActive: true,
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        age: 30,
        isActive: false,
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        age: 28,
        isActive: true,
      },
      {
        id: 4,
        name: "Dana White",
        email: "dana.white@example.com",
        age: 32,
        isActive: true,
      },
      {
        id: 5,
        name: "Evan King",
        email: "evan.king@example.com",
        age: 27,
        isActive: false,
      },
    ];

    return Response.json({ result: true, users });
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
