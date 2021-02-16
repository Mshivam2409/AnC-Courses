project = "anc-courses"

app "backend" {
    labels = {
        "service" = "anc-courses",
        "env" = "dev"
    }

    build {
        use "docker" {
            buildkit    = false
            disable_entrypoint = false
        }
    }

    deploy {
        use "docker" {}
    }
}