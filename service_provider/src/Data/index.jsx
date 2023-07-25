export const authHeaderData = [
  {
    name: "Locate",
  },
  {
    name: "About",
  },
];
export const profileButtonData = [
  { name: "Profile", icon: <i class="fa fa-user " aria-hidden="true"></i> },
  {
    name: "Edit Profile",
    icon: <i class="fa fa-pencil" aria-hidden="true"></i>,
  },
];
export const userMobileNav = [
  {
    name: "User",
    fabIcon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
      </svg>
    ),

    list: [
      {
        name: "Profile",
        fabIcon: <i class="fa fa-user" aria-hidden="true" />,
      },
      {
        name: "Edit Profile",
        fabIcon: <i class="fa fa-pencil" aria-hidden="true"></i>,
      },
    ],
  },
];
export const credentialMobilenav = [
  {
    name: "Credential",
    fabIcon: <i class="fa fa-key" aria-hidden="true"></i>,
    list: [
      {
        name: "Aadhar card",
        fabIcon: <i class="fa fa-address-card-o" aria-hidden="true"></i>,
      },
      {
        name: "Pan Card",
        fabIcon: <i class="fa fa-address-card-o" aria-hidden="true"></i>,
      },
      {
        name: "Bank Detail",
        fabIcon: <i class="fa fa-university" aria-hidden="true"></i>,
      },
      {
        name: "Bike Detail",
        fabIcon: <i class="fa fa-motorcycle" aria-hidden="true"></i>,
      },
    ],
  },
];
export const serviceMobileNav = [
  {
    name: "Services",
    fabIcon: (
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    ),
    list: [
      {
        name: "Puncture Repair",
      },
      {
        name: "Battery Jumpstart",
      },
      {
        name: "Towing Service",
      },
      {
        name: "On Spot Minor Repair",
      },
      {
        name: "Emergency Fuel",
      },
      {
        name: "KeyLock Assist",
      },
    ],
  },
];
export const authMobileNav = [
  {
    name: "order",
    fabIcon: (
      <img
        src="data:image/png;base64,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"
        alt="order"
      />
    ),
  },
  {
    name: "AddService",
    fabIcon: <i class="fa fa-wrench" aria-hidden="true"></i>,
  },
];
export const mobileList = [
  {
    name: "Contact Us",
    fabIcon: <i class="fa fa-address-book" aria-hidden="true" />,
  },
  {
    name: "About",
    fabIcon: (
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///9LS0tAQEBGRkZDQ0M1NTW0tLQ6Ojp+fn45OTlFRUWxsbE9PT0zMzPp6emamprz8/ONjY2Hh4ff39/Y2NhXV1fj4+PS0tKTk5OlpaVjY2Orq6t3d3fKysrZ2dlTU1O+vr5vb294eHhfX1+enp7Dw8MrKysjhO8/AAAKx0lEQVR4nO1d2YKiOhDVQMRAUMCWVVvoZf7/E6+0PXessGglFXSmOS/91DGHVGpLpbJYzJgxY8aMGTNmzJgxY8aMGTNmzJjxzyBKj3WRJ4em3J9Op33ZHJK8WB130aMnRoAoC+LS555kzPUdx1m2OP/1XZdJj7tlHGR/L890lZyEx/wLrX44PpNimazSR08WjahOpGD+CLdr+EzIpP6L1nJTlVzey+4PS15Wm0dP/R5EwbtgY4I5DIeJ9+DZV/L4FmrS+00yPBwfTWIYUbX0TOh9k/SW1XMuZJQLZkzvAiby59uRmyR0ifi1cMPkuThGCcfqzlvw+TNx3JLzu3DMH03sGyuPUj6v4XqrR5M743Uv75jr2RFlUnriAk/K1k294//k/vXRBGN+Y6KO23rYTXyOJbJdummR7rLjqogb5+yRu7f+nccP5Zf5owLqME+W23o3+P+7z20jvXEfwfWzCRkpiPnYzKR3CIbJ/cEuOHijW/lhy5iehi2877k55tNnuT9Ckp0eEl0F4ZBwOdLNX9DjveauHBwxDCwwuIG1GJiNyxtd3/nY8KGFFGvS2d9GtB+YiqFLudnyAdF395O6468DMQRzC+OxK7efo+PhJV8bdb8OZawiGb5i/Rx5TTL8HSh6Cfr8g+wXPsJeR5ebS8hdyPt0jMPXlPvkHKz07QMxiS+e9PmhbE+9SV72faIqE+Kf6cG6h6AT2hCfos/gSutWo48g29uJVTd9y2ibYp+I8q21n9v26DS7gpp3CTrSpuuf9Thy0qK6KbpalJV2XY2o7EqqsGY0egy9sB/YxN3Pasv0v3YJhjROzDiCsEvRSm4j8ro/NE0C/tj9tJ6NvbHv7HnvngieAruOoDp7+l9Zq+GSw5CB9+bzI1mv80DD+0k7qRyX3CwG6md0XJyZr9+5dP0zmCdidFJi08nJCeKoP+3sdoYiWDvXhs3Hu+mbjtEIaXM3J/UTeqjxD6oE+B5WSaWqonNOyBFGEatfkGOUTHTqSXmgDc1O1aiM0BZn6uAhagWWvSkPjt1IR3WncDp/UQ24cbu8HDiYCrET7Gg7HznAIGJFyHDiUQye3LjoiSibxSWSU9Vbc0rMf0fDmX+GDhJKRd6JvDfVmZEoTZ+PnEhwrM2IFHmgcW1WyqjI/T12eMPQYZCq8yTFEapihxguov8cPT/FL8FW2YoeeoQOFCnDykU8esKPFtPOnnGNA35VUYTIpFM3IrmGRgZko1hFjY8EkcA1QO+c8SIGprGNCiinvmFiagOXEK+7umEzYKiTI1B8ZG6WylSWkKNjOwsMX+BXN1tEReh9fNg5XurGtIK8NfzsWNUAoChSjV19GmUotRI9ivYzUacRdHWZxvFZMm4t9D7/B5QMoa9OKzgS0xiiHhdTzYkp89LPaS7NB4q6yc4/cHXPVJVPr/uhFkeoCNHBzhfWI2Kqr+ihfkCnRH7jAAyPpiykw663gZ6Hi+i86Y2iCJjQnEw+uBMNNIQSsoR6IwVgavo6uZOn+y2jte6IC9WO6dnVxTuYmf6e2fT7NZ5RVADdSeddawxgDJ1GfzZpX72a6blcA8YUOt8fbmY97+MbUaeO2LwU7wiG1FKDMOujZyr+RwFK8hxRmqfkoTZFZccugM6fcSgdbeXXRT3HcWWoXbx4jRwYWg2XGbpbHkHa7qVYl/t9kxNdw3sBCkzW6AGgy0yWXSYEsBca3gPYyOb5HguAJlFi/z0FtsJ7YLn8IDKwCAKru1ZwG1qZoinARkQntcA2dA5WZmgKEBmgN+ISfJ8HVMrfAeg4I4+EYf5isrISHHZATJGRCtzFaD01EeAkcdoQCICJ120VwPtGbiVwoOLaKyA1w/baIvq4YAW43Roe0SiiaJO+vmTHz3pVGZWH19diinS+gbugo2haFrsLi6D62ObJ+q0p35e+CDlv71h6npSSMXRBBgBUNSjPEgYWHPvL+S/+dVW0ZXGmwdy23Mv53drkGjqHT1eA08QoU4OP02J798VgQ4ZQ1DB+Gwig8ap0MoZAmaLSECA4RCqpxYQMgcpnNeI/wTkr/j7aZAyL6x9CnU+D0As/i8kYgggIFcSCyAKfZst/fbWocYSQN5qBGDIEtSyo6ALEJfiCif/VdvRSLEcLagwZAvcZFeMBHWUYWXQqCgkZAquG0vnAaUPnBxTUI6toyBDkWlBu2/56FloZ88HRSBnCkwdMKQyoLzBm+DHSS4CSISbKhwxNM7jBsEJ9Eoama/iMDGn34VQMMfuQVJdaZKivSyntoU2G+vbQ0KdRYI+hvk9j6JcqsMdQ3y81jC0U2GOoH1sYxocK7DHUjw8NY3wF9hjqx/iGeRoF9hjq52kMc20K7DHUz7UZ5ksV2GOony+F9/FMTb41hiaiRnpuYY2hybkF6dmTNYYmZ0+k54fWGJYG54ekZ8DWGIJJIitiSM/xbTE0OscnrcWwxdCoFoO0nsYWQ7N6GsqaKFsMzWqiYF2bWRBsiaFhXRtlbaIlhoa1iUp9qVERtCWGpvWlhDXCdhga1wgT1nnbYWhc563U6uvczPsNOwyNa/UJ71tYYUhw34LuzowVhgR3ZsjuPVlhSHHviezumhWGJHfXlPuH+tkaGwxJ7h/S3CFdWGEIW0fo3iGluQe8sMKQ6B4wxV3uFvQMqe5yU9zHb0HPkOw+PkFPhRbkDOl6KhD0xWhBzVBR8kY+s3lvkxbUDNXeJkbVMMb9aVoQMyTtT9PpMaTVb5KYIW2PIeM+US1oGRL3iTLu9dWClCF5ry/Tfm0tCkqGar82ghtLZj33Wow0cEFXQag99yiu1Rn2TVwoiUkIbPbBSt9Ew96XHQ8EwvvEDGWn96Vp/9LteMs28YHQXZb6l2r0oN2sVkFQVcVH3Nx8HNEVp/VHUVVBsLol/7Z60C4WnW7ht5z57Bdjlztrd70t277SfcatNyurTtd0KoL4XtDZ6CWLIdzQ/DZ7QaP7edtgaLWfd0+vp/HDLAsM046IkvZkx/bVp2dova8+8m2EjDsakMMM7b+NgHzfYndYa+Bt0EGZ4n2Lvo7AYqqXbKd5o+QHvDPzsLeCqqneCvoB7z39gDe7fsC7az/g7bwf8P7hD3jDcugd0tO/8w7pRG/Jrh/4luwPeA/4B7zp/Kh3uady9L8w/LY6N3tbPX+St9XPWA+1u3B5g8ryXuHY8KHco5jASqgI+szVRZ4ky/HG4yVnfT2jLyMaN1bWQnoaTtf7nptj/NUs90dSx+xEnJO5G/HYc1Wu9A7BPcphFxw8OZYZ5/ZDtEFk/mjO3mGeLLf1cG51V28b6XWSMPBLOY9tgBv3+h7XLM9ryd0mLlaf2S7dtEh32eeqiBuHn9fu1r8/cgEveO30W++dqO8yKT1xgSclu+9IQ+4nNYIDWN08XtKF65EcgBJgy0ffy9GEf+ssakpECTlHnydTOzHj2CQhpay6YWInb2CCKBc32s/dDSaMnFt7iKrlQMyBgeMtq+eST4DjWzhuv2/RY+FhmqMCfURBKTRJOky8B0+8fH+wqUousbrVZ7ysnnP39SKqEynYvSx9JmRC9LDHlEhXyUl8Pb0yIpg+k2KZrB4VHZkjyoK4bD1s1jqi382gz3/bCprWIy/jIPv71q6LKD3WRZ4cmnJ/Op32ZXNI8mJ13P0L3GbMmDFjxowZM2bMmDFjxowZM2bM+MZ/9JWYepkjbPYAAAAASUVORK5CYII="
        alt="about"
      />
    ),
  },
];
export const profileData = [
  {
    name: "profile",
    fabIcon: <i class="fa fa-user" aria-hidden="true" />,
  },
  {
    name: "Edit profile",
    fabIcon: <i class="fa fa-pencil" aria-hidden="true"></i>,
  },
  {
    name: "order",
    fabIcon: <i class="fa fa-wrench" aria-hidden="true"></i>,
  },
  {
    name: "ContactUs",
    fabIcon: <i class="fa fa-address-book" aria-hidden="true" />,
  },
  {
    name: "AddService",
    fabIcon: <i class="fa fa-wrench" aria-hidden="true"></i>,
  },
];
export const notAuthhHeaderData = [
  {
    name: "About",
  },
  {
    name: "ContactUs",
  },
  {
    name: "Login",
  },
];
export const orderData = [
  {
    serviceName: "Puncture Repair",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
  {
    serviceName: "Battery Jumpstart",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
  {
    serviceName: "Towing Service",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
  {
    serviceName: "On Spot Minor Repair",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
  {
    serviceName: "Emergency Fuel",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
  {
    serviceName: "KeyLock Assist",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    name: "Shubham",
  },
];
export const services = [
  {
    name: "Puncture Repair",
    price: "40",
  },
  {
    name: "Battery Jumpstart",
    price: "40",
  },
  {
    name: "Towing Service",
    price: "40",
  },
  {
    name: "On Spot Minor Repair",
    price: "40",
  },
  {
    name: "Emergency Fuel",
    price: "40",
  },
  {
    name: "KeyLock Assist",
    price: "40",
  },
];
