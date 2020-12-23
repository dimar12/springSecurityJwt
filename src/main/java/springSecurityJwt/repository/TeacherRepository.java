package springSecurityJwt.repository;
import springSecurityJwt.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
Teacher getById(int id);
}
