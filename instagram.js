//  page.on("response", async (response) => {
//     if (response.request().resourceType() === "xhr") {
//       if (
//         response.url().includes("https://www.instagram.com/graphql/query/")
//       ) {
//         const responseData = await response.json();
//         console.log(
//           responseData?.data?.user?.edge_chaining?.edges?.map((user) => ({
//             name: user.node.full_name,
//             username: user.node.username,
//           }))
//         );
//       }
//       // fs.writeFileSync('response.json', JSON.stringify(responseData, null, 2));
//     }
//   });

// await page.setGeolocation({ latitude: 29.7598976, longitude: 76.5591552 });

// fetch("https://www.instagram.com/api/v1/users/web_profile_info/?username=youngnishant", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
//     "dpr": "1.5",
//     "sec-ch-prefers-color-scheme": "dark",
//     "sec-ch-ua": "\"Chromium\";v=\"118\", \"Microsoft Edge\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
//     "sec-ch-ua-full-version-list": "\"Chromium\";v=\"118.0.5993.118\", \"Microsoft Edge\";v=\"118.0.2088.76\", \"Not=A?Brand\";v=\"99.0.0.0\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-model": "\"\"",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-ch-ua-platform-version": "\"15.0.0\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "viewport-width": "777",
//     "x-asbd-id": "129477",
//     "x-csrftoken": "qwgdXvz0OXRjjADZrurwcg8M4cAxPTCu",
//     "x-ig-app-id": "936619743392459",
//     "x-ig-www-claim": "hmac.AR1ByGvFJavGhyNEfPfm_k9RrXHRzQAptsr3zB68L5VX6ZnQ",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.instagram.com/tmvexploring/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
