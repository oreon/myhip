package com.oreon.jcomm.repository;

import com.oreon.jcomm.domain.Book;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Book entity.
 */
public interface BookRepository extends JpaRepository<Book,Long> {

}
