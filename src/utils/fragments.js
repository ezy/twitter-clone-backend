const USER_FRAGMENT = `
	id
	handle
	avatar
	firstname
	lastname
`;

const FILE_FRAGMENT = `
	id
	url
`;

exports.PROFILE_FRAGMENT = `
	fragment PROFILE_FRAGMENT on User {
		id
		coverPhoto
		avatar
		firstname
		lastname
    handle
    bio
    dob
    website
    location
	  following {
			id
		}
		followers {
			id
		}
		tweets {
			id
			text
			tags
			files {
				${FILE_FRAGMENT}
			}
			user {
				${USER_FRAGMENT}
			}
			createdAt
		}
		createdAt
	}
`;

exports.MASTER_TWEET_FRAGMENT = `
	fragment MASTER_TWEET_FRAGMENT on Tweet {
		id
		text
		tags
		files {
			id
			url
		}
		user {
			${USER_FRAGMENT}
		}
		comments {
			id
			text
			user {
				${USER_FRAGMENT}
			}
			createdAt
		}
		createdAt
	}
`;

exports.TWEET_FRAGMENT = `
	fragment TWEET_FRAGMENT on Tweet {
		id
		text
		tags
		files {
			id
			url
		}
		user {
			id
			avatar
			firstname
			lastname
			handle
		}
		createdAt
	}
`;

exports.TWEET_SELECT = {
  id: true,
  text: true,
  tags: true,
  files: {
    id: true,
    url: true,
  },
  user: {
    id: true,
    avatar: true,
    firstname: true,
    lastname: true,
    handle: true,
  },
  createdAt: true,
};

exports.TWEET = {
  id: true,
  text: true,
  tags: true,
  createdAt: true,
};

exports.FILE = {
  id: true,
  url: true,
};

exports.USER = {
  id: true,
  avatar: true,
  firstname: true,
  lastname: true,
  handle: true,
};

exports.COMMENT_FRAGMENT = `
	fragment COMMENT_FRAGMENT on Comment {
		id
		text
		user {
			${USER_FRAGMENT}
		}
		createdAt
	}
`;
