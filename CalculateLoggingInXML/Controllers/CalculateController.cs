using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace CalculateLoggingInXML.Controllers
{
    public class CalculateController : Controller
    {
        private IHostingEnvironment _env;
        private static int Id = 0;
        public CalculateController(IHostingEnvironment hostingEnviroment)
        {
            _env = hostingEnviroment;
        }


        public IActionResult Index()
        {
            return View();
        }


        public List<string> Compile(string str)
        {
            Id++;
            string strresult = "";
            List<string> result = str.Split(new char[] { ',' }).ToList();
            for (int i = 0; i < result.Count; i++)
            {
                if (result[i] == " ")
                {
                    result[i] = result[i].Replace(" ", "+");
                }
                strresult += result[i];
            }
            string date = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            string path = Path.Combine(_env.WebRootPath, "ILogger");
            string filename = "XMLDoc.xml";
            string root = Path.Combine(path, filename);


            XmlDocument _xmldoc = new XmlDocument();

            _xmldoc.Load(root);

            XmlNode xmlParentNode = _xmldoc.SelectSingleNode("calculations");
            if (xmlParentNode != null)
            {
                XDocument xDocument = XDocument.Load(root);

              
                xDocument.Element("calculations").Add(
                    new XElement("time", date),
                    new XElement("calculation", new XAttribute("Id", Id), result)
                    );
                xDocument.Save(root);
                return result;
            }
            else
            {
                try
                {   
                    XDocument logresult = new XDocument
                   (
                      new XDeclaration("1.0", "utf-8", "yes"),
                      new XElement
                        (
                          "calculations",
                        new XElement("time", date),
                         new XElement("calculation", new XAttribute("Id", Id), result)
                         )
                    );

                    logresult.Save(root);
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }

        }
    }
}