export class Author {
  public readonly username: string;
  public readonly profileName: string;
  public readonly profileImgUrl: string | null;

  constructor(author: { username: string; profileName: string; profileImgUrl: string | null }) {
    this.username = author.username;
    this.profileName = author.profileName;
    this.profileImgUrl = author.profileImgUrl;
  }
}
