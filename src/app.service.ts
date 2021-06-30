import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meetings.entity';
import { Task } from './task.entity';
// import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}
  async seed() {
    const ceo = this.employeeRepository.create({ name: 'CEO' });
    await this.employeeRepository.save(ceo);

    const ceoContactInfo = this.contactInfoRepository.create({
      email: 'ceo@gmail.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepository.save(ceoContactInfo);

    const manager = this.employeeRepository.create({
      name: 'Anubhav',
      manager: ceo,
    });
    const task1 = this.taskRepository.create({ name: 'Hire Intern' });
    await this.taskRepository.save(task1);
    const task2 = this.taskRepository.create({ name: 'Deploy App' });
    await this.taskRepository.save(task2);
    const task3 = this.taskRepository.create({ name: 'Send Salary' });
    await this.taskRepository.save(task3);
    manager.tasks = [task1, task2, task3];

    const meeting1 = this.meetingRepository.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepository.save(meeting1);
    manager.meetings = [meeting1];
    await this.employeeRepository.save(manager);
  }
  // getAll(): Promise<User[]> {
  //   return this.userRepository.find({
  //     relations: ['pets'],
  //   });
  // }
  // async getOneById(id: number): Promise<User> {
  //   try {
  //     const user = await this.userRepository.findOneOrFail(id);
  //     return user;
  //   } catch (err) {
  //     return this.userRepository.findOne(id);
  //   }
  // }
  // createUser(name: string): Promise<User> {
  //   const newUser = this.userRepository.create({ name });
  //   return this.userRepository.save(newUser);
  // }
  // async updateUser(id: number, name: string): Promise<User> {
  //   const user = await this.getOneById(id);
  //   user.name = name;
  //   return this.userRepository.save(user);
  // }
  // async deleteUser(id: number): Promise<User> {
  //   const user = await this.getOneById(id);
  //   return this.userRepository.remove(user);
  // }
  getHello(): string {
    return 'Hello World!';
  }
}
