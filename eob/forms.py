from django import forms 

class RegisterForm(forms.Form):
  ORGANIZATION_CHOICE = [
    ('1', 'Cá nhân'),
    ('2', 'Tổ chức')
  ]
  organization = forms.ChoiceField(choices=ORGANIZATION_CHOICE, widget=forms.RadioSelect, required=True)
  name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Họ và tên', 'class': 'form-control'}))
  organization_name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Tên tổ chức', 'class': 'form-control'}))
  company_code = forms.CharField(max_length=100, required=False, widget=forms.TextInput(attrs={'placeholder': 'Mã số thuế', 'class': 'form-control'})) 
  phone_number = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Số điện thoại', 'class': 'form-control'}))
  email = forms.EmailField( required=True, widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'form-control'}))
  password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': "Mật khẩu", 'class': 'form-control'}), required=True)
  confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': "Xác nhận mật khẩu", 'class': 'form-control'}), required=True)
  agree_policy = forms.BooleanField(label= "Đòng ý tất cả điều khoản trong điều khoản sử dụng",required=True, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))

  def clean(self):
    cleanned_data = super().clean()
    password = cleanned_data.get("password")
    confirm_password = cleanned_data.get("confirm_password")
    if password and confirm_password and password != confirm_password:
      raise forms.ValidationError('Mật khẩu và xác nhận mật khẩu không chính xác')

class LoginForm(forms.Form):
  email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'form-control'}))
  password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Mật khẩu', 'class': 'form-control'}), required=True)
  remember_password = forms.BooleanField(label="Ghi nhớ mật khẩu", required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
