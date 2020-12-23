package springSecurityJwt.controller;

import springSecurityJwt.entity.Teacher;
import springSecurityJwt.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping(value = "/teachers")
    public ResponseEntity<?> create(@RequestBody Teacher teacher) {
        teacherService.create(teacher);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/teachers")
    public ResponseEntity<List<Teacher>> read() {
        final List<Teacher> teachers = teacherService.readAll();
        return teachers != null && !teachers.isEmpty()
                ? new ResponseEntity<>(teachers, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/teachers/{id}")
    public ResponseEntity<Teacher> read(@PathVariable(name = "id") int id) {
        final Teacher teacher = teacherService.read(id);
        return teacher != null
                ? new ResponseEntity<>(teacher, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/teachers/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") int id, @RequestBody Teacher teacher) {
        final boolean updated = teacherService.update(teacher, id);

        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/teachers/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") int id) {
        final boolean deleted = teacherService.delete(id);

        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

}