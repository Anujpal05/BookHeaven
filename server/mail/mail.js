import nodemailer from "nodemailer";

const sendMail = (orderInfo) => {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER, // Your Gmail address
        pass: process.env.PASSKEY, // Your Gmail password or app-specific password
      },
    });

    // Set up email data
    let mailOptions = {
      from: process.env.SENDER, // Sender address
      to: orderInfo.user.email, // List of recipients
      subject: `Your Order Confirmation - Order ${orderInfo._id}`, // Subject line
      text: "Order Information", // Plain text body
      html: `  <div style="padding: 10px ; color :black">
    <h3><b>Hi ${orderInfo.user.username},</b></h3>
        ${
          orderInfo.status === "Ordered Placed"
            ? "<p>Thank you for shopping with us! We are pleased to confirm that we have received your order.</p>"
            : `${
                orderInfo.status === "Out for Delivery"
                  ? "<p>Your order is on its way! Our delivery team is currently out for delivery and will reach you soon. Thank you for your patience!</p>"
                  : `${
                      orderInfo.status === "Delivered"
                        ? "<p>Great news! Your order has been delivered successfully. We hope you enjoy your purchase! If you have any feedback or need assistance, please reach out to us.</p>"
                        : `${
                            orderInfo.status === "Cancelled"
                              ? "<p>We regret to inform you that your order has been cancelled. If you have any questions or need further assistance, please contact our support team.</p>"
                              : ""
                          }`
                    }`
              }`
        }
    <h2><b>Order Details:</b></h2>
    <p><b>Order Number:</b> ${orderInfo._id}</p>
    <p><b>Order Date:</b> ${orderInfo.createdAt}</p>
    <p><b>Items Ordered:</b></p>
    <table style="border-collapse: collapse; width: 100%">
      <tr style="border: 2px solid black">
        <th style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">Product Name</th>
        <th style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">Quantity</th>
        <th style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">Price</th>
      </tr>
      <tr style="border: 2px solid black">
        <td style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">
          ${orderInfo.book.title}
        </td>
        <td style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">1 </td>
        <td style="border: 2px solid black; padding: 8px; text-align:center; font-style:bold;">&#8377; ${
          orderInfo.book.price
        }</td>
      </tr>
    </table>
    <br>
    <br>
    <h3><b>Billing Information:</b></h3>

    <p><b> Payment Method:</b> Cash On Delivery</p>
    <p><b>Total Amount:</b>&#8377; ${orderInfo.book.price}</p>
    <h4>Thank you for your purchase! </h4>
    <hr/>
    <p><h3> Best regards, <h2>BookHeavean</h2></h3></p>

</div>    
 `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

export default sendMail;
