var gulp = require("gulp");
var sass = require("gulp-sass");
var rjs = require("gulp-requirejs");


// helper functions
var path = {
	src: function(path) {
		return "../src/" + path;
	},
	dest: function(path) {
		return "../dist/" + path;
	},
	root: function(path) {
		return __dirname + path;
	}
};


// main tasks
gulp.task("sass", function() {
	return gulp.src(path.src("/media/css/*.sass")).pipe(sass({ indentedSyntax: true })).pipe(gulp.dest(path.dest("/media/css/")));
});

gulp.task("copy-images", function() {
	return gulp.src(path.src("/media/img/**")).pipe(gulp.dest(path.dest("/media/img/")));
});

gulp.task("copy-audio", function() {
	return gulp.src(path.src("/media/audio/**")).pipe(gulp.dest(path.dest("/media/audio/")));
});

gulp.task("copy-phaser", function() {
	return gulp.src(path.root("/lib/phaser.min.js")).pipe(gulp.dest(path.dest("/media/js/")));
});

gulp.task("copy-root", function() {
	return gulp.src(path.src("/*")).pipe(gulp.dest(path.dest("/")));
});

gulp.task("js", function() {
	return rjs({
		baseUrl: path.src("/media/js"),
		out: "app.js",
		name: "app",
		include: "almond",
		wrap: false,
		insertRequire: ["app"],
		paths: {
			underscore: path.root("/lib/underscore-min"),
			almond: path.root("/lib/almond-0.3.1"),
		},
		shim: {
			underscore: {
				exports: "_"
			}
		}
	}).pipe(gulp.dest(path.dest("/media/js/")));
});

// default task - loads sites from config and runs the tasks for the supplied site
gulp.task("default", function() {
	gulp.run("copy-root", "copy-images", "copy-audio", "sass", "js", "copy-phaser");
});
