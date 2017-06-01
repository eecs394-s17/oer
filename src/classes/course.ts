export class Course {
  id: any;
  title: string;
  term: string;
  instructor: string;
  subject: string;
  catalog_num: string;
  section: string;
  topic: string;
  abbreviated_term: string;

  constructor(course?: any) {
    this.id = course && (course.$key ? course.$key : course.id) || '';
    this.title = course && course.title || '';
    this.term = course && course.term || '';
    this.instructor = course && course.instructor || '';
    this.subject = course && course.subject || '';
    this.catalog_num = course && course.catalog_num || '';
    this.section = course && course.section || '';
    this.topic = course && course.topic || null;
    this.abbreviated_term = course && course.abbreviated_term || '';
  }

  public setCourse(course: any) {
    this.id = course.$key ? course.$key : course.id;
    this.title = course.title;
    this.term = course.term;
    this.instructor = course.instructor;
    this.subject = course.subject;
    this.catalog_num = course.catalog_num; 
    this.section = course.section;
    this.topic = course.topic;
    this.abbreviated_term = course && course.abbreviated_term || '';
  }

  get searchName() {
    return this.subject+ " " + this.catalog_num + ": " + (this.topic ? this.topic : this.title) + " (" + this.instructor + ")";
  }

  get fullName() {
    return this.subject+ " " + this.catalog_num + ": " + (this.topic ? this.topic : this.title);
  }
}
