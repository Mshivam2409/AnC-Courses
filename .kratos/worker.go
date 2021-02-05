package kratos

import (
	"log"
	"os/exec"
)

func runKratos() {
	cmd := exec.Command("krtaos", "serve")
	cmd.Dir = entryPath

	if err := cmd.Start(); err != nil {
		log.Printf("Failed to start cmd: %v", err)
		return
	}
}
