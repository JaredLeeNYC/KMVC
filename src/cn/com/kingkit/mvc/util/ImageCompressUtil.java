package cn.com.kingkit.mvc.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
//import java.io.FileInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 等比例压缩图片工具
 * 
 * @author 黄庆勇
 * 
 */
public class ImageCompressUtil {

	/**
	 * 等比例压缩图片（dstWidth、dstHeight不能同时为0）
	 * 
	 * @param srcImage
	 *            原图片完整路径
	 * @param dstWidth
	 *            目标图片宽度，如为0表示只按高度比例压缩
	 * @param dstHeight
	 *            目标图片高度，如为0表示只按宽度比例压缩
	 * @param dstImage
	 *            目标图片完整路径
	 * @throws Exception
	 */
	public static void compressImage(String srcImage, int dstWidth,
			int dstHeight, String dstImage) throws Exception {
		FileOutputStream out = null;
		try {
			File file = new File(srcImage); // 读入文件
			Image src = javax.imageio.ImageIO.read(file); // 构造Image对象
			int width = src.getWidth(null);// 得到源图宽
			int height = src.getHeight(null); // 得到源图高
//			int newWidth = 0; // 新图宽
//			int newHeight = 0; // 新图高
			double rate1 = (double) dstWidth / width;
			double rate2 = (double) dstHeight / height;
			double rate;// 压缩比率
            
			if (rate1 > 1 && rate2 > 1) {
				// 目标图片大于原图片，不用压缩
				// return;//直接返回会报out空指针，2010.3.19
				rate = 1;// 按原大小输出新图片
			} else if (rate1 == 0) {
				// rate = rate2;//2010.3.19
				rate = rate2 > 1 ? 1 : rate2;
//				newWidth = (int)(width * rate);
//				newHeight = (int)(height * rate);
			} else if (rate2 == 0) {
				// rate = rate1;//2010.3.19
				rate = rate1 > 1 ? 1 : rate1;
//				newWidth = (int)(width * rate);
//				newHeight = (int)(height * rate);
			} else {
				rate = rate1 < rate2 ? rate1 : rate2;
//				newWidth = dstWidth;
//				newHeight = dstHeight;
			}

			if (1 == rate) {// 2010.3.19
				if(srcImage.equals(dstImage)){
					return;
				}
				FileInputStream inputStream = new FileInputStream(file);
				out = new FileOutputStream(dstImage);
				byte[] b = new byte[200];
				while (inputStream.read(b) > 0) {
					out.write(b);
				}
			} else {
				BufferedImage tag = new BufferedImage((int)(width * rate),
				(int)(height * rate), BufferedImage.TYPE_INT_RGB);
				tag.getGraphics().drawImage(src, 0, 0, (int)(width * rate),
						(int)(height * rate), null); // 绘制缩小后的图
				out = new FileOutputStream(dstImage); // 输出到文件流
				JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
				encoder.encode(tag); // 近JPEG编码
			}

		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (null != out) {
					out.close();
				}
			} catch (IOException e) {
				throw e;
			}
		}

	}
}