build:
	ls .. | grep -v backup | xargs -I{} bash -c "rm -rf ../{}"
	python3.9 structure_generator.py
	 ls .. | grep -v backup | xargs -I{} bash -c "tree ../{}" > ../README.md