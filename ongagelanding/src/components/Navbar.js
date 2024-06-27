import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 1rem;
`;


const Brand = styled.a`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  max-width: 80%;
`;

const Logo = styled.img`
  height: 50px;
  max-width: 300px;
  margin-right: 0.5rem;
  /* margin-left: 100%; */


`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Brand href="/">
        <Logo src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAA8CAYAAACAVsR+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACjZJREFUeNrsXf114jgQV+7t/8dWcKSCdSoIVBBSAVABoYIsFSRUEFNBSAU4FcRXAVwFSwnnIaM7r2NpRh82Bub3nl82C5Flaean+ZKslEAgEAgEAoFAIBAIBAKBQCAQOOBKhuB/XF9fT4offdPn2+32p4ySoAG5A5mbWL6SFrK3a6Mv32Q6fsO4uAaWz4UQBE0ACOHR8nlWXK0Qwh8yFwKBoDELoTB/noofieUr88L8yWXoO2e2DgjrCLAr5i5ltme1po7tfhX9S0QO23EZEkKwejLsnUSPMFu1Iq0LRdoz2vtRXCNLO3nRzvqIzzsr+vDOJbhLgbgMAr1ir5l+6ojZ5Ir4fBxhle/7WgfqM4j3KDMvhCDwV2LAXSSCGfkqdAmvRRs9RzKA77/gr/3i9xeZdiEEQT045vPIQQkpgpkEWgeJg8WiyWCjfo9xTah4hxCC4FLdBljRs4huA0UwIW7DDH8+MslgUPz4UPUB78fi800Ei0UIQSBuA0EwtsAhmOwj1w6i4j6U2pgQ339Fy8Cm8EAYW5/+CCEIztlKgFWdyiK4+P9NBBerfv+TzY0pnum++DEsLluaEYjr+siZDyEEwenGEphtUS6IU3Cx+O6D+prWBjJ4JYguQ1KoU/gpkEZb5cFCCIJzdBu4K/sk0nf0XpMnk8lPZQywfmJasRQWUosghCCwK05OmNeAhLmyz2KQC2YCqBThBIODPYIU7vHXXDasCSEIeFiGug0Y2eeQhjG4CG0UF2QHuEVEcM+tLdCIrgFYBQuZZiEEAQ+c4No48HPrd5EkwCpIHPt+KD7CfTVGwrv0AKIQgsDFbdgrOrhodBvQbJ843PJLcBEV9sZjJdcZgznhFgmEEAQO4AQXTW7DxON+szpiQj8fiIGzqUoyBgE4qQNScFPKGE3IRH3dOZmpz/r5t6bNQfRRb0t9UTV9eVOfp93sA+4zwGfuq6/pthyV5B1WxdirHqTqivvviDgA9O2Zo9wMwJjOTSt60RdIG26UecfstI2MQcn60fNfHp89zsuuNC/7yPcfVPSgfO8M5d9rHK4aGKyNsm9/HmJO2FX5HhUvQFUenKVLFJnR9+/qs0Jupty2cS9co9lIfk+KPqOgSkIL1/El+vGgzKm+/75WXpFRYDeet7QqNY7Lh+sYM/rEmiPMdrjM/0EOgTRNxMDo2xDJ2UUmchxLp0Wi0y4D+JSopC+OZKBwwqBG/QMHMgZ0tNv1TAfdj54DGWwcyUDh9zdEMM0VHEtrVGM1+GJMWC15TUwhayN9iHUOrvOvz5nYhuyVwEXRRSYSlIXkLAihtBIMApvyGhgD+hH60aNIkDCLOXiL6DbsGKQwrjGnbSumzb8fUIqDyl9uY96CPD6pgN2Z6rPmwTeuMcBF0VUmylu9T5cQIilFdWA2ES2FEFKgJugx8LnXMV0GBBVcTEpjSynNUtE1Dpz4w6L0vHkL8vgQ2EwIaYUc5JK4bNjqqoXwquIftebMlg1hhD5jneBxUnWgCEO8qmW4ujQ3KjBASwXGxkxlThWdzuSsxLpPqxbmjHommIP70rw8V8ZrceQ0593JEgL6SpyVPEXh14rB8XUTaqssEztk/Jtioq/gUp9psZT5948W09BKBmAugwWAF2QwbnAMoE/T2BHtynhziM5m7h/eL8CocehR86TbaKm4aEC4QBD0W5fmBWTjGomhifJoHUd5Vrxj79iubhfTjpR5pCegyrgpCiRlXcwcFNekGPOq4mF/pkUflgx35+An1/iUFBH+aVCODAWwSSwJsxmEjgpmLipuyISwOFKH9pp29WyWp4mwYsc2Dvswyi5hIUcLtHyjnOPQKQuBWfs+NJlfOFD3Dv6uj39uXYWxb0OO6+Bx/wdIe7meIxjJbQDyygIUZ10mQJyrHUWaDCuhC9iY3MDI+JKyj008XXMZqEFNKV8MBywNvE9QYAj7+Ex87UfN/2WM5sGC+gWnAEGNQMvHfoX460vm/7n47m2BQ4RACpBafGro1KWFZSHcnSsh3HoIVR2otNtfAatkLOXpG8iMu+qN0ETf4pbfNo7+Wjv07zeFMmQ+KOKedEQuuWncPrpVQNa/kBxiWXPPbTzoSe1lcIjUhpi2bffVl/SqFs8rWg29Bp9pr3jBW5avHyO42BJSDyLsITnEOKcxa8s9OsvNTR3yLX36/lPRh5PYrIZNw110JawdURfR+AtdIsmTbzq3h2QdQgrvbT3rWRLCMYJukfswVP6ZkKTJ9wyg5ePiOi2I9jIVGFxsiRTWOC++i81LgEzshRDqlYxr6g+Iz9soEhkFCB9s+dU1FplHE02vqlwrgfty2JMILpbSuwtPF8JXJvJLJYQ8kpJRlVn/NExIAKqe4p0jgMU1RCHkFl8B+g2vqlzrZRGpvUlXBFSfz1Bc39X/VYlci+lWdRxdIwRKSWaUoJde5GlD5tk/ltmHu+Iohcy57gZW96X4foHvTEXrN6kUDCVmByCZwcWjuw0183KoSiyua0W/96HROTlXQsgIU0wHaPoWMqCCaruADIDONw9MAoNkQBHS3lRyi0L3YYoDlE4Q4ihkk6BScUvH4K4tuJgd+wQkPBfCuJWeWRTX+WB3E6XL3sE0EKBiwNeEQiU4MWlFKO/w76j7h5a7alLI8f5aUH8w70/5zNq6gDMUwMSc+ihD05tpgNAspyntlWPenDidaXVkMtAHkyiceygS8qkL+PuiCAFXN8rPplhyjrGCHkE6D8p9S2oe8YitRPnVMxiVBa2CcpwELJEtkqQmH1CYsbIHTts6TXhliJX4Hhu3VF/3Q+xbfB6TTL9WZA8KjmbYr7fKgqQ6MC+dcRnI4A+j9LiJTSFasKYdGPPavRDohpgCkfo4cn161CDAAomJNPL969pbH7mu5NVgtfRxQdrg9UAsYtkpnPQcjRCQSanIesY0H9MGlHfegQmZWrbr7iP5mGkDB6SY5mlXM6epr79vCC6ujjxnMWIXTS1ynbYQOEc8vTkIhyaFfYTJGEZyFfJAMkgJy2kYKIAp1i+0iVXkGE25vV1b5GaZl6kK20dg2q5/noSAB6F+KF6NQOo4GfD9G+VftQd/dx1RqIYewgH3vuEQEgqNfjHJ3lHo5kcgg+rr49eh2YBK5eKqC0qCB574FInpuT+Zl8J88yAAHTiE61bxi4W8Ak0oYFM8CALudafq38mgFUNH/33uBwL4TsU38BCUGfryicHMBGFYuZIR3uMnXFj/fqfM72SA670Dby9O0YeOFbvQwcWYz7UjrJeMQVQZprzL89KvkT/X92RQfeOQbOjfH3DlQQg+x4PvcaWO/cIKTQz7Y7IwCkn/2P044vMf0nJYVRmjvcOhuHg8nKBFtEUI0w6sYoKGSTFm8RCQwinvWhVCsLsKUxlqgaD7aLp0WchAIBBCOF7UWyAQ+KOJvQwQK1jI67gFgsslBFB+qMBbChEIBJdFCDrPqv+dCwkIBAKBQCAQCAQCgUAgEAgEl4N/BRgAs/yh4eJXU18AAAAASUVORK5CYII=" alt="Logo" />
      </Brand>
    </NavbarContainer>
  );
};

export default Navbar;
