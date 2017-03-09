@utilites\upload_ftp\upload_maker.exe > %temp%\ftp_command.txt
copy c:\ftp_header.txt+%temp%\ftp_command.txt c:\ftp_config.txt
ftp -s:c:\ftp_config.txt ray72.ru
pause