# compact-log
A file and stdout logger for [node.js](https://nodejs.org), supports namespaces, colors, compressed time strings and 8 log levels.

## example
![screenshot](https://github.com/dodekeract/raw/raw/master/compact-log.png)

````javascript
	var Log = require('./index.js');
	var log = new Log({
		path: __dirname + '/log',
		levelMode: 'smartNoBrackets'
	});

	log.emergency('emergency');
	log.alert('alert');
	log.critical('critical');
	log.error('error');
	log.warning('warning');
	log.separator();
	log.notice('notice');
	log.info('info');
	log.debug('debug');
	log.separator('Separators can use text.', 'info');
	log.info('It\'s able to use %s formats!', 'stuff');
	log.separator('emergency separator', 'emergency');
	log.debug('You can even dump objects.', {
		test: true,
		woah: 'affirmative'
	});
	log.de('You can use');
	log.dbug('some shorter');
	log.debu('variations to log!');
	log.warning('This is a really long line, which will probably overflow the width of this console window.');

	var ns = log.createNamespace({
		name: 'test'
	});

	ns.sepa('Even separators can use short functions.');
	ns.info('Namespaces, yay!');
	ns.se(false, 'alert');

	var time = log.createNamespace({
		name: 'compressed time test'
	});

	var n = 0;
	setInterval(function () {
		time.debug(n++);
	}, 1000);
````

## installation
Just type ````npm install compact-log````.
If you want to save it as a dependency in ````package.json```` you should use ````npm install compact-log --save````.

## initialization
````javascript
	var Log = require('compact-log');
	var log = new Log({/*options*/});
	log.info('Hello world!');
````

## options
You can pass options when calling ````new Log(options)````. Options is an object which can contain the following attributes.

|                attribute|default value    |description                                                                                                                                   |
|------------------------:|:----------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
|                 logLevel|'debug'          |sets the logLevel for console & file logs                                                                                                     |
|          consoleLogLevel|=logLevel        |overrides the logLevel for consoleLogs only                                                                                                  |
|             fileLogLevel|=logLevel        |overrides the logLevel for fileLogs only                                                                                                     |
|        separatorLogLevel|=logLevel        |sets the default logLevel for separators                                                                                                      |
|           compressedTime|'day'            |shortens the timestamp of each output and logs a time-update output when the given time period is exceeded (e.g. ever day) and a log is issued|
|                levelMode|'shortNoBrackets'|allows changing of the level names (e.g. ERROR -> E)                                                                                          |
|                     path|false            |sets the log folder                                                                                                                           |
|compressedTimeAsSeparator|true             |allows disabling the separator layout for compressedTime-messages                                                                             |
|               prettyJSON|true             |prints the log file's JSON with tab characters and newlines                                                                                   |

### Accepted values for these options
- **logLevel:** none, emergency, alert, critical, error, warning, notice, info, **debug**, 0-8
- **consoleLogLevel:** none, emergency, alert, critical, error, warning, notice, info, **debug**, 0-8
- **fileLogLevel:** none, emergency, alert, critical, error, warning, notice, info, **debug**, 0-8
- **separatorLogLevel:** none, emergency, alert, critical, error, warning, notice, info, **debug**, 0-8
- **compressedTime:** none, year, month, **day**, hour, minute, second
- **levelMode:** short, smart, full, tiny, **shortNoBrackets**, smartNoBrackets, fullNoBrackets, tinyNoBrackets, numbers, single
- **path:** **false** or any path to a (existing or non-existing) folder
- **compressedTimeAsSeparator:** **true**, false
- **prettyJSON:** **true**, false

## methods
### .emergency(args), .emer, .mrgc, .em
Logs a message with logLevel = 'emergency'.
### .alert(args), .aler, .alrt, .al
Logs a message with logLevel = 'alert'.
### .critical(args), .crit, .crtc, .cr
Logs a message with logLevel = 'critical'.
### .error(args), .erro, .rror, .er
Logs a message with logLevel = 'error'.
### .warning(args), .warn, .wrng, .wa
Logs a message with logLevel = 'warning'.
### .notice(args), .noti, .notc, .no
Logs a message with logLevel = 'notice'.
### .info(args), .in
Logs a message with logLevel 7 = 'info'.
### .debug(args), debu, .dbug, .de
Logs a message with logLevel 8 = 'debug'.
### .separator(text, logLevel), .sepa, .se
Creates a separator consisting of a dashed line (-----). If text is specified it will show this text in the line's center. ````logLevel```` will override the default ````separatorLogLevel````.
### .createNamespace(options)
Creates a namespace. Namespaces will automatically append their name to the log message. Options currently only supports ````name: 'enter name here'````.
Example:
````javascript
	var ns = log.createNamespace({name: 'test'});
	ns.info('It worked!');
````

## License
The MIT License (MIT)

Copyright (c) 2015 Florian Wendelborn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
