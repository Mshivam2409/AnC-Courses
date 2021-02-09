package jobs

import (
	"bufio"
	"fmt"
	"log"
	"os/exec"
)

func runKratos() {
	cmd := exec.Command("krtaos", "serve")

	stderr, _ := cmd.StderrPipe()

	if err := cmd.Start(); err != nil {
		log.Printf("Failed to start cmd: %v", err)
		return
	}

	scanner := bufio.NewScanner(stderr)
	scanner.Split(bufio.ScanWords)
	for scanner.Scan() {
		m := scanner.Text()
		fmt.Println(m)
	}
}
