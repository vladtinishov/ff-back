export const ru = `
  <div style="text-align: center">
    <h1>Восстановление пароля</h1>
    <h3 style="font-size: 19px">Добрый день, {{login}}!</h3>
    <p style="font-size: 18px; font-weight: 500">Вы запросили восстановление пароля на платформе Генезис. Чтобы восстановить пароль, необходимо перейти по ссылке:</p>

    <a href="http://localhost:8080/recovery/?hash={{hash}}" style="font-size: 19px;">Восстановление пароля</a>

    <p>Если это были не вы просто удалите это сообщение.</p>
  </div>
`