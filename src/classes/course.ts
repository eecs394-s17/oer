export class Course {
  id: any;
  title: string;
  term: string;
  instructor: string;
  subject: string;
  catalog_num: string;
  section: string;
  topic: string;

  constructor(course?: any) {
    this.id = course && (course.$key ? course.$key : course.id) || '';
    this.title = course && course.title || '';
    this.term = course && course.term || '';
    this.instructor = course && course.instructor || '';
    this.subject = course && course.subject || '';
    this.catalog_num = course && course.catalog_num || '';
    this.section = course && course.section || '';
    this.topic = course && course.topic || null;
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
  }

  get searchName() {
    return this.subject+ " " + this.catalog_num + ": " + (this.topic ? this.topic : this.title) + " (" + this.instructor + ")";
  }

  get fullName() {
    return this.subject+ " " + this.catalog_num + ": " + (this.topic ? this.topic : this.title);
  }
}
