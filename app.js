const express = require("express");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

let data = null

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	client.setConfig({
		apiKey: "98ca6213e3bb6a1a8a0e58e34ed33386-us1",
		server: "us1",
	});

	const run = async () => {
		const response = await client.lists.addListMember("8832825dae", {
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName,
			},
      
		});
    data = response
	};
  
	run();
  // if(data.body.status != 200){
  // res.sendFile(`${__dirname}/error.html`);
  // }
  console.log(data)
  // console.log(`------------${res.statusCode}--------------`)
	// if (res.statusCode === 200) {
  //   res.sendFile(`${__dirname}/success.html`);
	// } else {
  //   res.sendFile(`${__dirname}/error.html`);
	// }
});

app.listen(3000, () => console.log(`Example app listening on port 3000`));

console.log(data)
//API Key
// 98ca6213e3bb6a1a8a0e58e34ed33386-us1

// List id
// 8832825dae
