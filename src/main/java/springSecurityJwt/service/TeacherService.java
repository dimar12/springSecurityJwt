package springSecurityJwt.service;

import springSecurityJwt.entity.Teacher;

import java.util.List;

public interface TeacherService {

    void create(Teacher teacher);

    List<Teacher> readAll();

    Teacher read(int id);

    boolean update(Teacher teacher, int id);

    boolean delete(int id);
}