build:
	ls .. | grep -v backup | xargs -I{} bash -c "rm -rf ../{}"
	python3.9 structure_generator.py

	echo '```' > ../README.md
	ls .. | grep -v backup | xargs -I{} bash -c "tree --charset=ascii ../{}" >> ../README.md
	echo '```' >> ../README.md