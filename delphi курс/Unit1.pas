unit Unit1;

interface

uses Menus, jpeg, ExtCtrls, Controls, StdCtrls, Classes,
Windows, Messages, SysUtils, Variants, Graphics, Forms,
Dialogs;

type
TForm1 = class(TForm)
MainMenu1: TMainMenu;
Label1: TLabel;
Button1: TButton;
Button2: TButton;
Button3: TButton;
Button4: TButton;
N: TMenuItem;
N1: TMenuItem;
N5: TMenuItem;
Button5: TButton;
Label2: TLabel;
Memo1: TMemo;
Panel1: TPanel;
    Button7: TButton;
    Edit1: TEdit;
    Button8: TButton;
    Edit2: TEdit;
    Memo2: TMemo;
    Button6: TButton;
    Image1: TImage;
procedure Button1Click(Sender: TObject);
procedure N5Click(Sender: TObject);
procedure FormCloseQuery(Sender: TObject; var CanClose: Boolean);
procedure Button3Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button6Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button8Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
    procedure N1Click(Sender: TObject);
private
{ Private declarations }
public

end;

var
Form1: TForm1;

implementation
    uses  Unit3, Unit4, Unit5, Unit6, Unit7, Unit8, Unit9, Unit10;
{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
begin
Form3.Show;
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
Form5.Show;
end;

procedure TForm1.Button3Click(Sender: TObject);
begin
Form4.Show;
end;




procedure TForm1.Button4Click(Sender: TObject);
begin
Form6.Show;
end;

procedure TForm1.Button5Click(Sender: TObject);
begin
   Form9.Show;
end;

procedure TForm1.Button6Click(Sender: TObject);
begin
   Form1.Memo1.Lines.Add('</body>') ;
   Form1.Memo1.Lines.Add('</html>');
end;

procedure TForm1.Button7Click(Sender: TObject);
begin
 Form1.Close;
end;

procedure TForm1.Button8Click(Sender: TObject);
begin
Form8.Show;
end;

procedure TForm1.FormCloseQuery(Sender: TObject; var CanClose: Boolean);
begin
{ }
end;


procedure TForm1.N1Click(Sender: TObject);
begin
   Form10.Show;
end;

procedure TForm1.N5Click(Sender: TObject);
begin
Form1.Close;
end;

end.
