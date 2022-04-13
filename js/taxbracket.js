const app = {
  data() {
    return {
      earning: 0.0,
      taxResult: 0.0,
      stateTax: 0.0,
      calculation: "",
      brackets: {
        mfj: [
          [10, 1, 19900],
          [12, 19901, 81050],
          [22, 81051, 172750],
          [24, 172751, 329850],
          [32, 329851, 418850],
          [35, 418851, 628300],
          [37, 628301, Number.MAX_SAFE_INTEGER],
        ],
      },
    };
  },
  // mounted() {},
  // computed: {},
  methods: {
    handleFormSubmit() {
      let result = 0.0;
      let erng = this.earning;
      let temp = 0.0;
      this.calculation = "";
      this.calculation += "Federal: \n\n";

      for (let txr of this.brackets.mfj) {
        if (erng > txr[2]) {
          temp = ((txr[2] - txr[1] + 1) * txr[0]) / 100;
          result += temp;
          this.calculation += `$${txr[2] - txr[1] + 1} * ${
            txr[0]
          }% = $${temp}\n`;
        } else {
          temp = ((erng - txr[1] + 1) * txr[0]) / 100;
          result += temp;
          this.calculation += `$${erng - txr[1] + 1} * ${txr[0]}% = $${temp}\n`;
          break;
        }
      }

      this.calculation += `--------------------------------\nTotal => $${result}\n`;

      this.taxResult = result;
      this.stateTax = erng * 0.0495;
      this.calculation += `\nState: \n\n$${erng} * 4.95% = $${erng * 0.0495}\n`;
      this.calculation += `--------------------------------\nGrand Total => $${
        result + erng * 0.0495
      }`;
    },
    formatCurr(number) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    },
  },
};

Vue.createApp(app).mount("#app");
