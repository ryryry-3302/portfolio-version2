#!/bin/bash

# Compile all resume files to PDF and clean auxiliary files.
# Run relative to the directory containing this script.

set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

cleanup_auxiliary_files() {
    local base="$1"

    rm -f \
        "${base}.aux" \
        "${base}.out" \
        "${base}.toc" \
        "${base}.lof" \
        "${base}.lot" \
        "${base}.fls" \
        "${base}.fdb_latexmk" \
        "${base}.synctex.gz"
}

compile_resume() {
    local file="$1"
    local base="${file%.*}"
    local log_file="${base}.log"

    if [ ! -f "$file" ]; then
        echo "Error: $file not found"
        return 1
    fi

    echo "Compiling $file..."

    /usr/bin/pdflatex \
        -interaction=nonstopmode \
        -halt-on-error \
        -file-line-error \
        "$file" >"${base}.compile.log" 2>&1

    local status=$?

    if [ "$status" -eq 0 ] && [ -f "${base}.pdf" ]; then
        cleanup_auxiliary_files "$base"
        rm -f "$log_file" "${base}.compile.log"

        echo "Successfully compiled ${base}.pdf"
        return 0
    fi

    echo "Failed to compile $file"
    echo "Relevant compiler output:"
    tail -n 30 "${base}.compile.log"

    # Remove incomplete PDF so an old or malformed PDF is not mistaken for success.
    rm -f "${base}.pdf"

    # Clean everything except the diagnostic compile log.
    cleanup_auxiliary_files "$base"
    rm -f "$log_file"

    return 1
}

files=(
    "fullstack_resume.txt"
    "devops_resume.txt"
    "embedded_resume.txt"
    "mlai_resume.txt"
    "robotics_resume_us.txt"
    "robotics_resume_sg.txt"
)

failed=0

for file in "${files[@]}"; do
    if ! compile_resume "$file"; then
        failed=1
    fi
done

echo ""

if [ "$failed" -eq 0 ]; then
    echo "Compilation complete."
else
    echo "Compilation completed with errors."
    exit 1
fi