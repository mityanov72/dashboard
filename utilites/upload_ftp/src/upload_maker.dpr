program upload_maker;

{$APPTYPE CONSOLE}
{$R *.res}

uses
  System.SysUtils, Classes;

var
  dir_list: TStringList;
  current_dir: string;
  s: string;
  i: integer;

procedure GetDirList(Path: string; Root: string; OutList: TStringList);
var
  searchResult : TSearchRec;
  hSearch: THandle;
  i: integer;
begin
  if not DirectoryExists(Path) then exit;
  if Root <> '' then Root := IncludeTrailingBackslash(Root);
  Path := IncludeTrailingBackslash(Path);

  if FindFirst(Path + '*.*', faAnyFile, searchResult) = 0 then
  begin
    repeat
      if (searchResult.attr and faDirectory) = faDirectory then
      begin
        if((searchResult.Name <> '.') and (searchResult.Name <> '..') and (searchResult.Name <> '.git')) then
        begin
          OutList.Add('MKDIR "'+searchResult.Name+'"');
        end;
      end;
    until FindNext(searchResult) <> 0;
    FindClose(searchResult);
  end;

  if FindFirst(Path + '*.*', faAnyFile, searchResult) = 0 then
  begin
    repeat
      // ѕоказываем только каталоги
      if (searchResult.attr and faDirectory) = faDirectory then
      begin
        if((searchResult.Name <> '.') and (searchResult.Name <> '..') and (searchResult.Name <> '.git')) then
        begin
          {OutList.Add('mkdir '+Root+searchResult.Name);
          OutList.Add('cd '+Root+searchResult.Name);
          OutList.Add('lcd '+Root+searchResult.Name);}
          OutList.Add('LCD "'+searchResult.Name+'"');
          OutList.Add('CD "'+searchResult.Name+'"');
          GetDirList(Path+searchResult.Name, searchResult.Name, OutList);
          OutList.Add('LCD ..');
          OutList.Add('CD ..');
        end;
      end else begin
        OutList.Add('PUT "'+searchResult.Name+'"');
      end;
    until FindNext(searchResult) <> 0;

    // ƒолжен освободить ресурсы, используемые этими успешными, поисками
    FindClose(searchResult);
  end;
end;

begin
  try
    current_dir := extractfilepath(paramstr(0));
    dir_list := TStringList.Create;
    GetDirList('D:\01_Documents\GitHub\', '', dir_list);
    for i := 0 to dir_list.Count-1 do
    begin
      Writeln(dir_list.Strings[i]);
    end;
    //Writeln(dir_list.Text);
    //readln(s);
    { TODO -oUser -cConsole Main : Insert code here }
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;

end.
