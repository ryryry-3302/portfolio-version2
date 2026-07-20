#!/bin/bash
# Compile all resume .txt files to PDF and clean up auxiliary files

# Function to compile a single resume
compile_resume() {
    local file="$1"
    local base="${file%.*}"
    
    if [ ! -f "$file" ]; then
        echo "Error: File $file not found"
        return 1
    fi
    
    echo "Compiling $file..."
    
    # Compile using pdflatex with clean environment
    if env -i PATH=/usr/bin:/bin HOME=$HOME /usr/bin/pdflatex -interaction=nonstopmode "$file" >/dev/null 2>&1; then
        # Clean up auxiliary files only if compilation succeeded
        rm -f "${base}.aux" "${base}.log" "${base}.out" "${base}.toc" \
              "${base}.lof" "${base}.lot" "${base}.fls" "${base}.fdb_latexmk" \
              "${base}.synctex.gz" 2>/dev/null
        echo "✓ Successfully compiled $base.pdf"
        return 0
    else
        echo "✗ Failed to compile $file"
        return 1
    fi
}

# Compile all resume files
compile_resume "fullstack_resume.txt"
compile_resume "devops_resume.txt"
compile_resume "embedded_resume.txt"
compile_resume "mlai_resume.txt"

echo ""
echo "Compilation complete!"



