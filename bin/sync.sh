# rsync -aP --delete ~/Dropbox/Sites/fuelticker/site/ clarke.dreamhost.com:duncanclark.net/demos/fuelticker
s3cmd -c ~/.s3cfg-guardian sync --delete-removed -v -M -P --add-header=Cache-Control:max-age=0 site/ s3://gdn-cdn/embed/kiln/fuelticker/
