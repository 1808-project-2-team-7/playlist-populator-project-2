package com.revature.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
}
