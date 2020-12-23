package springSecurityJwt.service;

import springSecurityJwt.entity.Teacher;
import springSecurityJwt.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public void create(Teacher teacher) {
        teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher>  readAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher read(int id) {
        return teacherRepository.getById(id);
    }

    @Override
    public boolean update(Teacher teacher, int id) {
        if (teacherRepository.existsById(id)) {
            teacher.setId(id);
            teacherRepository.save(teacher);
            return true;
        }

        return false;
    }

    @Override
    public boolean delete(int id) {
        if (teacherRepository.existsById(id)) {
            teacherRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
