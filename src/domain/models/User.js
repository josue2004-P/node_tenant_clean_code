class User {
  constructor({
    id,
    firstName,
    lastName,
    middleName,
    username,
    email,
    avatar,
    isInactive,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.isInactive = isInactive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
