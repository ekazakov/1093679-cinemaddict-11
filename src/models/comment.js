export default class Comment {
  constructor(comment) {
    this.id = comment.id;
    this.emoji = comment.emotion;
    this.commentText = comment.comment;
    this.commentAutor = comment.author;
    this.commentDate = new Date(comment.date);
  }

  commentToSend() {
    return {
      "comment": this.commentText,
      "date": this.commentDate.toISOString(),
      "emotion": this.emoji
    };
  }

  commentToRAW() {
    return {
      "id": this.id,
      "emotion": this.emoji,
      "comment": this.commentText,
      "author": this.commentAutor,
      "date": this.commentDate.toISOString()
    };
  }

  static clone(data) {
    return new Comment(data.commentToRAW());
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
