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
