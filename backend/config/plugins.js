module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::page.page"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
        "api::page.page": ["MyField"],
      },
      blockedAuthorProps: ["name", "email"],
      reportReasons: {
      },
    },
  },
});

// module.exports = ({ env }) => ({
//   seo: {
//     enabled: true,
//   },
//   comments: {
//     enabled: true,
//     config: {
//       badWords: false,
//       moderatorRoles: ["Authenticated"],
//       approvalFlow: ["api::article.article"],
//       entryLabel: {
//         "*": ["Title", "title", "Name", "name", "Subject", "subject", "Website", "website", "Email", "email"],
//         "api::article.article": ["*"],
//       }, 
//       reportReasons: {
//       },
//     },
//   },
// });
