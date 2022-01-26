package api

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type ListItem struct {
	Id   string `json:"id"`
	Item string `json:"item"`
	Done bool   `json:"done"`
}

var db *sql.DB
var err error

func SetupPostgres() {
	// when running locally
	db, err = sql.Open("postgres", "postgres://postgres:password@postgres:5432/todo?sslmode=disable")

	if err != nil {
		log.Println(err.Error())
	}

	if err = db.Ping(); err != nil {
		log.Println(err.Error())
	}

	log.Println("Connected to postgres")
}

// List all todo items
func TodoItems(c *gin.Context) {
	// Use SELECT Query to obtain all rows
	rows, err := db.Query("SELECT * FROM list")
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "DB Error"})
	}

	// Get all rows and add into items
	items := make([]ListItem, 0)

	if rows != nil {
		defer rows.Close()
		for rows.Next() {
			// Individual row processing
			item := ListItem{}
			if err := rows.Scan(&item.Id, &item.Item, &item.Done); err != nil {
				fmt.Println(err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}
			item.Item = strings.TrimSpace(item.Item)
			items = append(items, item)
		}
	}

	// Return JSON object of all rows
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	c.JSON(http.StatusOK, gin.H{"items": items})
}

// Delete todo item
func DeleteTodoItem(c *gin.Context) {
	id := c.Param("id")

	// Validate id
	if len(id) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an id"})
	} else {
		// Find and delete the todo item
		var exists bool
		err := db.QueryRow("SELECT * FROM list WHERE id=$1;", id).Scan(&exists)
		if err != nil && err == sql.ErrNoRows {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		} else {
			_, err = db.Query("DELETE FROM list WHERE id=$1;", id)
			if err != nil {
				fmt.Println(err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}

			// Log message
			log.Println("deleted todo item", id)

			// Return success response
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
			c.JSON(http.StatusOK, gin.H{"message": "successfully deleted todo item", "todo": id})
		}
	}
}
