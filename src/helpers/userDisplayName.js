export const userDisplayName = (user) => {
  let displayName;

  if (user.username) {
    displayName = `@${user.username}`;
  } else if (user.name) {
    displayName = user.name;
  } else if (user.email) {
    displayName = user.email;
  }

  return displayName;
};
