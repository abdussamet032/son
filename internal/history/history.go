package history

import (
	"database/sql"
	"os"
	"path/filepath"
	"time"

	"github.com/abdussamet032/son/internal/config"
	_ "modernc.org/sqlite"
)

type Entry struct {
	Path       string
	AccessCount int
	LastAccess time.Time
	Pinned     bool
}

type Store struct {
	db *sql.DB
}

func Open() (*Store, error) {
	dir := config.DataDir()
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, err
	}

	dbPath := filepath.Join(dir, "history.db")
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS history (
			path TEXT PRIMARY KEY,
			access_count INTEGER DEFAULT 0,
			last_access INTEGER DEFAULT 0,
			pinned INTEGER DEFAULT 0
		)
	`)
	if err != nil {
		db.Close()
		return nil, err
	}

	return &Store{db: db}, nil
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) Record(path string) error {
	_, err := s.db.Exec(`
		INSERT INTO history (path, access_count, last_access)
		VALUES (?, 1, ?)
		ON CONFLICT(path) DO UPDATE SET
			access_count = access_count + 1,
			last_access = ?
	`, path, time.Now().Unix(), time.Now().Unix())
	return err
}

func (s *Store) Get(path string) (Entry, bool) {
	var e Entry
	var lastAccess int64
	var pinned int
	err := s.db.QueryRow(
		"SELECT path, access_count, last_access, pinned FROM history WHERE path = ?",
		path,
	).Scan(&e.Path, &e.AccessCount, &lastAccess, &pinned)
	if err != nil {
		return Entry{}, false
	}
	e.LastAccess = time.Unix(lastAccess, 0)
	e.Pinned = pinned == 1
	return e, true
}

func (s *Store) Pin(path string) error {
	_, err := s.db.Exec(`
		INSERT INTO history (path, pinned, last_access)
		VALUES (?, 1, ?)
		ON CONFLICT(path) DO UPDATE SET pinned = 1
	`, path, time.Now().Unix())
	return err
}

func (s *Store) Unpin(path string) error {
	_, err := s.db.Exec(`UPDATE history SET pinned = 0 WHERE path = ?`, path)
	return err
}

func (s *Store) AllPinned() ([]string, error) {
	rows, err := s.db.Query("SELECT path FROM history WHERE pinned = 1 ORDER BY last_access DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var paths []string
	for rows.Next() {
		var p string
		if err := rows.Scan(&p); err != nil {
			continue
		}
		paths = append(paths, p)
	}
	return paths, nil
}

func (s *Store) All() (map[string]Entry, error) {
	rows, err := s.db.Query("SELECT path, access_count, last_access, pinned FROM history")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	entries := make(map[string]Entry)
	for rows.Next() {
		var e Entry
		var lastAccess int64
		var pinned int
		if err := rows.Scan(&e.Path, &e.AccessCount, &lastAccess, &pinned); err != nil {
			continue
		}
		e.LastAccess = time.Unix(lastAccess, 0)
		e.Pinned = pinned == 1
		entries[e.Path] = e
	}
	return entries, nil
}
