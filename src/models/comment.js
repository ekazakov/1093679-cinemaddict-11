export default class Comment {
  constructor(comment) {
    this.id = comment.id;
    this.emoji = comment.emotion;
    this.commentText = comment.comment;
    this.commentAutor = comment.author;
    this.commentDate = new Date(comment.date);
  }

  commentToRAW() {
    return {
      // "author": this.commentAutor,
      "comment": this.commentText,
      "date": this.commentDate.toISOString(),
      "emotion": this.emoji
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  /* static clone(data) {
    return new Comment(data.commentToRAW());
  }*/

}
