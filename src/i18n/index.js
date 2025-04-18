import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      Username: 'Username',
      your_username: 'Enter your username',
      Password: 'Password',
      your_password: 'Enter your password',
      Remember_me: 'Remember me',
      Trouble_logging_in: 'Trouble logging in',
      Login: 'Login',
      google_login: 'Log in with Google',
      facebook_login: 'Log in with Facebook',
      apple_login: 'Log in with Apple',
      By_creating_an_account: 'By continuing, I agree to the Service Agreement and Privacy Policy',
      Incorrect_password: 'Incorrect password',
      Login_failed: 'Account created successfully',
      Login_failed_message: 'Yay! Your account has been created. Please try logging in and enjoy the features!',
      Home: 'Home',
      Genre:'Genre',
      Search:'Search',
      Hot_Movies:'Hot Movies',
      Trending_Searches:'Trending Searches',
      Download:'Download',
      All:'All',
      ABOUT:'About',
      New_Release:'New Release',
      Scan_QR_code_to_download_START_TV_App:'Scan QR code to download START TV App',
      History:'History',
      My_list:'My List',
      More:'More',
      Points_Center:'Points Center',
      Log_out:'Log out',
      Comments:'Comments',
      Share:'Share',
      All_Episodes:'All Episodes',
      Play:'Play',
      Add_to_My_List:'Add to My List',
      Contact_Us:'Contact Us',
      Terms_of_Service:'Terms of Service',
      Privacy_Policy:'Privacy Policy',
      Company:'Company',
      Feedback:'Feedback',
      Media_Public_Relations:'Media & Public Relations',
      All_rights_reserved:'All rights reserved. 2025 START TV Studio Inc.©',
      Movie_Cast_List:'Movie Cast List',
      Latest_Movie_Reviews:'Latest Movie Reviews',
      Personal_Center:'Personal Center',
      Top_Up:'Top Up',
      My_Likes:'My Likes',
      Coins:'Coins',
      Bonus:'Bonus',
      Details:'Details',
      All_Records:'All Records',
      Recharge_Record:'Recharge Records',
      Load_More:'Load More',
      Log_in_to_earn_points:'Log in to earn points',
      Total_of_1270_Coins:'Total of 1270 Coins',
      Check_in:'Check in',
      Download_APP:'Download APP',


      
    }
  },
  ru: {
    message: {
      Username: 'Имя пользователя',
      your_username: 'Введите ваше имя пользователя',
      Password: 'Пароль',
      your_password: 'Введите ваш пароль',
      Remember_me: 'Запомнить меня',
      Trouble_logging_in: 'Проблемы с входом в систему' ,
      Login: 'Войти',
      google_login: 'Войти с помощью Google',
      facebook_login: 'Войти с помощью Facebook',
      apple_login: 'Войти с помощью Apple',
      By_creating_an_account: 'Продолжая, вы соглашаетесь с условиями обслуживания конфиденциальности и политикой конфиденциальности',
      Incorrect_password: 'Неверный пароль',
      Login_failed: 'Аккаунт успешно создан',
      Login_failed_message: 'Ура! Ваш аккаунт успешно создан. Пожалуйста, попробуйте войти и наслаждайтесь функциями!',
      Home: 'Главная',
      Genre:'Жанр',
      Search:'Поиск',
      Hot_Movies:'ГорЯЧие фильмы',
      Trending_Searches:'ГорЯЧие  запросы',
      Download:'Скачать',
      All:'Все',
      ABOUT:'О нас',
      New_Release:'Новые релизы',
      Scan_QR_code_to_download_START_TV_App:'Сканируйте QR-код, чтобы скачать приложение START TV',
      History:'История',
      My_list:'Мой список',
      More:'Больше',
      Points_Center:'Центр баллов',
      Log_out:'BЫXOД',
      Comments:'Комментарии',
      Share:'Поделиться',
      All_Episodes:'Все эпизоды',
      Play:'Играть',
      Add_to_My_List:'Добавить в мой список',
      Contact_Us:'Связаться',
      Terms_of_Service:'Условия предоставления услуг',
      Privacy_Policy:'Политика конфиденциальности',
      Company:'Компания',
      Feedback:'Обратная связь',
      Media_Public_Relations:'Медиа и PR',
      All_rights_reserved:'Все права защищены © 2025 StartTV Studio',
      Movie_Cast_List:'Список актеров фильма',
      Latest_Movie_Reviews:'Последние обзоры фильмов',
      Personal_Center:'Личный кабинет',
      Top_Up:'Пополнить счет',
      My_Likes:'Мои любимые',
      Coins:'Золотые монеты',
      Bonus:'Бонусы',
      Details:'Подробности',
      All_Records:'Все записи',
      Recharge_Record:'История пополнений',
      Payment_Record:'История расходов',
      Load_More:'Загрузить больше',
      Log_in_to_earn_points:'Войдите, чтобы получить баллы',
      Total_of_1270_Coins:'Всего 1270 золотых монет',
      Check_in:'Зарегистрироваться',
      Download_APP:'Скачать приложение',
    






    }
  },
  ar: {
    message: {
      Username: 'اسم المستخدم',
      your_username: 'أدخل اسم المستخدم الخاص بك',
      Password: 'كلمة المرور',
      your_password: 'أدخل كلمة المرور الخاصة بك',
      Remember_me: 'تذكرني',
      Trouble_logging_in: 'مشكلة في تسجيل الدخول',
      Login: 'تسجيل الدخول',
      google_login: 'تسجيل الدخول باستخدام جوجل',
      facebook_login: 'تسجيل الدخول باستخدام فيسبوك',
      apple_login: 'تسجيل الدخول باستخدام أبل',
      By_creating_an_account: 'المتابعة تعني موافقتي على شروط الخدمة وسياسة الخصوصية',
      Incorrect_password: 'كلمة المرور غير صحيحة',
      Login_failed: 'تم إنشاء الحساب بنجاح',
      Login_failed_message: 'ياي! تم إنشاء حسابك بنجاح. يرجى محاولة تسجيل الدخول والاستمتاع بالميزات!',
      Home: 'الرئيسية',
      Genre:'النوع',
      Search:'بحث',
      Hot_Movies:'الأفلام الشائعة',
      Trending_Searches:'البحث الشائع',
      Download:'تحميل',
      All:'الكل',
      ABOUT:'عنا',
      New_Release:'إطلاق منتج جديد',
      Scan_QR_code_to_download_START_TV_App:'امسح رمز الاستجابة السريعة لتحميل تطبيق START TV',
      History:'تاريخي',
      My_list:'قائمةي',
      More:'المزيد',
      Points_Center:'مركز النقاط',
      Log_out:'تسجيل الخروج',
      Comments:'تعليق',
      Share:'شارك',
      All_Episodes:'جميع الحلقات',
      Play:'تشغيل',
      Add_to_My_List:'إضافة إلى قائمتي',
      Contact_Us:'اتصل بنا',
      Terms_of_Service:'شروط الخدمة',
      Privacy_Policy:'سياسة الخصوصية',
      Company:'الشركة',
      Feedback:'الملاحظات',
      Media_Public_Relations:'الإعلام والعلاقات العامة',
      All_rights_reserved:'جميع الحقوق محفوظة. 2025 START TV Studio Inc.©',
      Movie_Cast_List:'قائمة ممثلي الفيلم',
      Latest_Movie_Reviews:'أحدث تعليقات الأفلام',
      Personal_Center:'المركز الشخصي',
      Top_Up:'إعادة الشحن',
      My_Likes:'الدفع الآن',
      Coins:'العملات الذهبية',
      Bonus:'المكافأة',
      Details:'التفاصيل',
      All_Records:'جميع السجلات',
      Recharge_Record:'سجل إعادة الشحن',
      Payment_Record:'سجل الاستهلاك',
      Load_More:'تحميل المزيد',
      Log_in_to_earn_points:'تسجيل الدخول للحصول على النقاط',
      Total_of_1270_Coins:'إجمالي 1270 عملة ذهبية',
      Check_in:'تسجيل الوصول',
      Download_APP:'تحميل التطبيق',






    }
  }
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: localStorage.getItem('language') || 'en', // 从 localStorage 读取上次设置的语言，默认为英语
  fallbackLocale: 'en', // 设置备用语言
  messages
})

// 添加切换语言的方法
export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale) // 保存语言设置到 localStorage
}

export default i18n 