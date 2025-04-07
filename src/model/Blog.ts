export class Blog {
  public readonly username: string;
  public readonly profileName: string;
  public readonly profileImgUrl: string | null;

  constructor(blog: { username: string; profileName: string; profileImgUrl: string | null }) {
    this.username = blog.username;
    this.profileName = blog.profileName;
    this.profileImgUrl = blog.profileImgUrl;
  }
}
